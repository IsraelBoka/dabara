import React from 'react';
import { Facebook } from './icons/facebook';
import { Github } from './icons/github';
import { Instagram } from './icons/instagram';
import { LinkedIn } from './icons/linkedin';
import { Youtube } from './icons/youtube';

interface NetworkProps {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
}

export const Network = (props: NetworkProps) => {
  const { facebook, twitter, instagram, linkedin, github, youtube } = props;
  return (
    <div>
      <div className="flex flex-row items-center justify-center [&_a]:m-1">
        {facebook && (
          <a href={facebook} target="_blank" rel="noreferrer">
            <Facebook className="h-8 w-8" />
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noreferrer">
            <i className="fab fa-twitter text-2xl text-blue-400 hover:text-blue-500"></i>
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noreferrer">
            <Instagram className="h-8 w-8" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer">
            <LinkedIn classname="w-8 h-8" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noreferrer">
            <Github classname="w-8 h-8" />
          </a>
        )}
        {youtube && (
          <a href={youtube} target="_blank" rel="noreferrer">
            <Youtube className="h-8 w-8" />
          </a>
        )}
      </div>
    </div>
  );
};
