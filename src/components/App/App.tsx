import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes, deleteNote, createNote } from "../../services/noteService";
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { NoteTag } from '../../types/note';

export default function App() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        }
    });

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            setIsModalOpen(false);
        }
    });

    // Handlers
    const handleDeleteNote = (id: string) => {
        deleteMutation.mutate(id);
    };

    const handleCreateNote = (values: { title: string; content: string; tag: NoteTag }) => {
        createMutation.mutate(values);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Data fetching
    const [debouncedSearch] = useDebounce(search, 500);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, debouncedSearch],
        queryFn: () => fetchNotes(page, 12, debouncedSearch)
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={setSearch} />
                {data && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
                <button className={css.button} onClick={handleOpenModal}>
                    Create note +
                </button>
            </header>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading notes</p>}

            {data?.notes && data.notes.length > 0 && (
                <NoteList notes={data.notes} onDelete={handleDeleteNote} />
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <NoteForm onSubmit={handleCreateNote} onCancel={handleCloseModal} />
            </Modal>
        </div>
    );
}