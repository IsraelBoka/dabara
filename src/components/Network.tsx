import React from 'react';
import { Facebook } from './icons/facebook';
import { Github } from './icons/github';
import { Instagram } from './icons/instagram';
import { LinkedIn } from './icons/linkedin';
import { Twitter } from './icons/twitter';
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
      {facebook || twitter || instagram || linkedin || github || youtube ? (
        <div className="flex flex-row items-center justify-center [&_a]:m-1">
          {facebook && (
            <a
              href={
                facebook.startsWith('https://www.facebook.com/')
                  ? facebook
                  : `https://www.facebook.com/${facebook}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="h-8 w-8" />
            </a>
          )}
          {twitter && (
            <a
              href={
                twitter.startsWith('https://twitter.com/')
                  ? twitter
                  : `https://twitter.com/${twitter}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <Twitter className="h-8 w-8" />
            </a>
          )}
          {instagram && (
            <a
              href={
                instagram.startsWith('https://www.instagram.com/')
                  ? instagram
                  : `https://www.instagram.com/${instagram}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="h-8 w-8" />
            </a>
          )}
          {linkedin && (
            <a
              href={
                linkedin.startsWith('https://www.linkedin.com/in/')
                  ? linkedin
                  : `https://www.linkedin.com/in/${linkedin}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <LinkedIn classname="w-8 h-8" />
            </a>
          )}
          {github && (
            <a
              href={
                github.startsWith('https://github.com/') ? github : `https://github.com/${github}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <Github classname="w-8 h-8" />
            </a>
          )}
          {youtube && (
            <a
              href={
                youtube.startsWith('https://www.youtube.com/channel/')
                  ? youtube
                  : `https://www.youtube.com/channel/${youtube}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <Youtube className="h-8 w-8" />
            </a>
          )}
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <p className="text-gray-500">Aucun réseau social</p>
        </div>
      )}
    </div>
  );
};
