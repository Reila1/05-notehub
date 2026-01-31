import axios from 'axios';
import { Note, NoteTag } from '../types/note';

const api= axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
    }
});
interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}
export const fetchNotes = async (
  page: number, 
  perPage: number, 
  search?: string
): Promise<FetchNotesResponse> => {
    const response = await api.get<FetchNotesResponse>('/notes', {
        params: {
            page, perPage, search
        }
    });
    return response.data;
}
interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
    const response = await api.post<Note>('/notes', noteData);
    return response.data;
}
export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
}
