import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onSubmit: (values: NoteFormValues) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required()
});

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo' as NoteTag
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field id="content" name="content" as="textarea" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              Create note
            </button>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}