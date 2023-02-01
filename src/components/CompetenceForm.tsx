import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../utils/api';

interface CompetenceFormProps {
  competence?: string[];
  closeModalCompetence?: () => void;
}

export const CompetenceForm = ({ competence, closeModalCompetence }: CompetenceFormProps) => {
  const { handleSubmit, register } = useForm({
    values: {
      competencesTechniques: competence,
    },
  });

  const utils = api.useContext();

  const updatecompetence = api.page.updateuser.useMutation({
    async onSuccess() {
      await utils.page.getPage.invalidate();
      toast.success('Competences mises à jour');
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    closeModalCompetence && closeModalCompetence();

    await updatecompetence.mutateAsync({
      competence: data.competencesTechniques,
    });
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col justify-center rounded p-8 ">
          {/** checkbox */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded   "
                type="checkbox"
                value="HTML"
                {...register('competencesTechniques')}
              />
              <label className="py-2 text-white">HTML</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded  "
                type="checkbox"
                value="CSS"
                {...register('competencesTechniques')}
              />
              <label className="py-2 text-white">CSS</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded  "
                type="checkbox"
                value="Javascript"
                {...register('competencesTechniques')}
              />
              <label className="py-2 text-white">Javascript</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded  "
                type="checkbox"
                value="React"
                {...register('competencesTechniques')}
              />
              <label className="py-2 text-white">React</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded"
                type="checkbox"
                value="NodeJS"
                {...register('competencesTechniques')}
              />
              <label className="py-2 text-white">NodeJS</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded"
                type="checkbox"
                value="Angular"
                {...register('competencesTechniques')}
              />
              <label className="py-2 text-white">Angular</label>
            </div>
          </div>
        </div>
        <button
          className="rounded bg-blue-300 p-2 font-bold text-gray-800 transition-colors duration-300 hover:bg-blue-400"
          type="submit"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};
