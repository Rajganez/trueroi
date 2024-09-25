
const ActivityList = () => {
  return (
    <div>
      <div className="mx-2 p-2">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="p-2">Name of the Activity</th>
              <th className="p-2">Activity Date</th>
              <th className="p-2">Sent</th>
              <th className="p-2">Recipient</th>
              <th className="p-2">Unsubscribed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Offer 20% Notification</td>
              <td>Aug 26,2024</td>
              <td>60</td>
              <td>52</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Offer 20% Notification</td>
              <td>Aug 26,2024</td>
              <td>60</td>
              <td>52</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Offer 20% Notification</td>
              <td>Aug 26,2024</td>
              <td>60</td>
              <td>52</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityList;
