import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '../components/container';
import { FilterIcon } from '../components/icons/filter';
import { Logo } from '../components/icons/logo';
import { SearchIcon } from '../components/icons/searchicon';
import Loader from '../components/Loader';
import { api } from '../utils/api';

const Recherche = () => {
  const [recherche, setRecherche] = useState<string>('');
  const [tags] = useState<string[]>([]);

  const profiles = api.profile.searchprofile.useQuery(
    { search: recherche, Tags: tags },
    {
      enabled: recherche !== '' && recherche.length > 3,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
  );

  return (
    <Container classname="lg:px-48">
      <div>
        <div className="flex w-full items-center  justify-center">
          <Link href="/" className="duration-300 hover:scale-105">
            <Logo classname=" w-16 h-16 animate-fade-in [--animation-delay:200ms] opacity-0 " />
          </Link>
        </div>
        <div className="mb-4 flex  animate-fade-in items-center justify-center opacity-0 [--animation-delay:400ms]   ">
          <div className=" rounded-l-sm bg-[#2b2d3c] p-1">
            <SearchIcon className="h-6 w-6" />
          </div>
          <input
            className="decoration-none w-full rounded-r-sm bg-[#2b2d3c] p-1 focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 "
            type="text"
            placeholder="Recherche..."
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>
        <button className="">
          <FilterIcon className="h-6 w-6 animate-fade-in text-white opacity-0 [--animation-delay:600ms]" />
        </button>
        {profiles.isFetching ? (
          <Loader />
        ) : profiles.data?.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-white">Aucun résultat</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {profiles.data?.map((profile) => {
              return (
                <Link
                  href={`/${profile.page || ''}`}
                  key={profile.id}
                  className="flex w-48 flex-col items-start justify-center gap-1 rounded  p-2 hover:bg-[#2b2d3c] "
                >
                  <div className="flex items-center  ">
                    <Image
                      alt="image du profile"
                      src={profile.image || ''}
                      width={58}
                      height={58}
                      className="rounded-full"
                    />
                    <div className="flex flex-col items-center justify-center  text-xs">
                      <p className="text-white">{profile.name}</p>
                      <p className="text-white">{profile.fonction}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 ">
                    {profile.Competence.map((competence) => {
                      return (
                        <span
                          key={competence.id}
                          className="rounded bg-blue-100 px-0.5 py-0.5  text-xs font-medium text-blue-800 "
                        >
                          {competence.name}
                        </span>
                      );
                    })}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Recherche;
