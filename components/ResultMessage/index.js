import s from './ResultMessage.scss';

export default ({ count, startDate, endDate }) => {
  let dateRange = '';
  if (startDate && endDate)  {
    dateRange = ` between ${startDate} and ${endDate}`;
  } else if (startDate && !endDate) {
    dateRange = ` since ${startDate}`;
  } else if (!startDate && endDate) {
    dateRange = ` before ${endDate}`;
  }

  return count > 0 && (
    <div className={s.resultMessage}>
      {`Displaying cumulative data of ${count} games${dateRange}.`}
    </div>
  );
}