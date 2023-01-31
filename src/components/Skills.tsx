import { type Competence } from '@prisma/client';
import { Angularjs } from './icons/skills/angular';
import { Css } from './icons/skills/css';
import { Html } from './icons/skills/html';
import { Javascript } from './icons/skills/javascript';
import { Nodejs } from './icons/skills/nodejs';
import { Reactjs } from './icons/skills/react';

interface SkillsProps {
  competence?: Competence[];
}

export const Skills = ({ competence }: SkillsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {competence?.map((skill) => (
        <div key={skill.id} className="p-1">
          {skill.name === 'Angular' && (
            <div className="group relative flex flex-col items-center justify-center">
              <Angularjs className="   h-8 w-8" />
              <p className="absolute top-9 hidden select-none rounded-md bg-gray-800 p-1 text-xs group-hover:block">
                Angular{' '}
              </p>
            </div>
          )}
          {skill.name === 'HTML' && (
            <div className="group relative flex flex-col items-center justify-center">
              <Html className="h-8 w-8" />
              <p className="absolute top-9 hidden select-none rounded-md bg-gray-800 p-1 text-xs group-hover:block">
                HTML{' '}
              </p>
            </div>
          )}
          {skill.name === 'CSS' && (
            <div className="group relative flex flex-col items-center justify-center">
              <Css className="h-8 w-8" />
              <p className="absolute top-9 hidden select-none rounded-md bg-gray-800 p-1 text-xs group-hover:block">
                CSS{' '}
              </p>
            </div>
          )}
          {skill.name === 'Javascript' && (
            <div className="group relative flex flex-col items-center justify-center">
              <Javascript className="h-8 w-8" />
              <p className="absolute top-9 hidden select-none rounded-md bg-gray-800 p-1 text-xs group-hover:block">
                Javascript{' '}
              </p>
            </div>
          )}
          {skill.name === 'React' && (
            <div className="group relative flex flex-col items-center justify-center">
              <Reactjs className="h-8 w-8" />
              <p className="absolute top-9 hidden select-none rounded-md bg-gray-800 p-1 text-xs group-hover:block">
                React{' '}
              </p>
            </div>
          )}
          {skill.name === 'NodeJS' && (
            <div className="group relative flex flex-col items-center justify-center">
              <Nodejs className="h-8 w-8" />
              <p className="absolute top-9 hidden select-none rounded-md bg-gray-800 p-1 text-xs group-hover:block">
                NodeJS{' '}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
