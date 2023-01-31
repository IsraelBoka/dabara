import { useForm } from 'react-hook-form';

interface FormProps {
  name: string;
}
export const CompetenceForm = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
                {...register('competencesTechniques', {
                  required: true,
                })}
              />
              <label className="py-2 text-white">HTML</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded  "
                type="checkbox"
                value="CSS"
                {...register('competencesTechniques', {
                  required: true,
                })}
              />
              <label className="py-2 text-white">CSS</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded  "
                type="checkbox"
                value="Javascript"
                {...register('competencesTechniques', {
                  required: true,
                })}
              />
              <label className="py-2 text-white">Javascript</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded  "
                type="checkbox"
                value="React"
                {...register('competencesTechniques', {
                  required: true,
                })}
              />
              <label className="py-2 text-white">React</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded"
                type="checkbox"
                value="NodeJS"
                {...register('competencesTechniques', {
                  required: true,
                })}
              />
              <label className="py-2 text-white">NodeJS</label>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                className="rounded"
                type="checkbox"
                value="Angular"
                {...register('competencesTechniques', {
                  required: true,
                })}
              />
              <label className="py-2 text-white">Angular</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
