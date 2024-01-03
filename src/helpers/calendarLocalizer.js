import { parse, startOfWeek, getDay, format } from 'date-fns';
import enES from 'date-fns/locale/es';
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
    'es': enES,
  };
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });