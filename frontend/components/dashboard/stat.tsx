import React, { useEffect } from 'react';
import { ThumbsUp } from 'akar-icons';
import { faFileCircleExclamation, faMoneyCheckDollar, faTriangleExclamation, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLazyQuery } from '@apollo/client';
import { COUNT_SUMMARY_STATS, REQUESTS_QUERY } from '@/gql/query';
import client from '@/gql/client';

export interface StatProps {
  props: {
    title?: string;
    icon?: string;
    value?: number;
    variables?: any;
  };
}

function getIcon(key: string | undefined) {
  switch (key) {
    case 'awaiting-approval':
      return <FontAwesomeIcon size='xl' icon={faFileCircleExclamation} />;
    case 'pending-request':
      return <FontAwesomeIcon size='xl' icon={faTriangleExclamation} />
    case 'purchase-order':
      return <FontAwesomeIcon size='xl' icon={faMoneyCheckDollar} />;
    case 'vendor-responses':
      return <FontAwesomeIcon size='xl' icon={faTruckFast} />;
    default:
      return;
  }
}

export default function Stat({ props }: StatProps) {

  const [getStats, { loading, error, data }] = useLazyQuery(COUNT_SUMMARY_STATS, { client });

  useEffect(() => {
    getStats({ variables: props.variables });
  }, [])

  return (
    <div className='bg-gradient-to-r from-white to-cyan-50  rounded-lg p-3 flex flex-col gap-2 hover:bg-accent-yellow hover:text-cprimary'>
      <div className='grid grid-cols-2 min-h-[3rem]'>
        <h5 className='text-sm leading-4'>{props.title}</h5>
        <div className='flex justify-end'>
          {getIcon(props.icon)}
        </div>
      </div>
      <span className='text-3xl font-semibold'>{data ? data?.countRequests : props.value}</span>
    </div>
  );
}
