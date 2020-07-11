import ForgeUI, { render, IssueGlance, Fragment, Text, useProductContext, useState, useAction, Button } from '@forge/ui';
import api from "@forge/api";

const App = () => {
  const fetchDateForIssue = async (issueId) => {
    const res = await api
      .asApp()
      .requestJira(`/rest/api/3/issue/${issueId}?fields=created`);
    const data = await res.json();
    return data.fields.created;
  };

  const context = useProductContext();
  const issueCreated = useState(async () => await fetchDateForIssue(context.platformContext.issueKey))[0];
  const [json, setJson] = useState(
    async () => {
      var date = new Date(issueCreated);
      var url = "http://history.muffinlabs.com/date/" + (Number(date.getMonth())+1).toString() + "/" + date.getDate();
      var res = await api.fetch(url);
      return res.json();
    },
    {data:{Events:[]}}
  );
  
  return (
      <EventList dateTime={issueCreated} data={json} length={json.data.Events.length}/>
  );
};

const EventList = ({dateTime, date, month, data, length}) => (
  data.data.Events.length > 0 ?
  (
    <Fragment>
        <Text>__{new Date(dateTime).toDateString()}__</Text>
        <Text>__[{new Date(dateTime).getFullYear()}](#)__: This issue was filed.</Text>
        <Text>__[{data["data"]["Events"][length-1].year}]({data["data"]["Events"][length-1]["links"][0]["link"]})__: {data["data"]["Events"][length-1].text}</Text>
        <Text>__[{data["data"]["Events"][length-2].year}]({data["data"]["Events"][length-2]["links"][0]["link"]})__: {data["data"]["Events"][length-2].text}</Text>
        <Text>__[{data["data"]["Events"][length-3].year}]({data["data"]["Events"][length-3]["links"][0]["link"]})__: {data["data"]["Events"][length-3].text}</Text>
        <Text>__[{data["data"]["Events"][length-4].year}]({data["data"]["Events"][length-4]["links"][0]["link"]})__: {data["data"]["Events"][length-4].text}</Text>
        <Text>__[{data["data"]["Events"][length-5].year}]({data["data"]["Events"][length-5]["links"][0]["link"]})__: {data["data"]["Events"][length-5].text}</Text>
        <Text>   </Text>
        <Text>_This page uses material from Wikipedia, which is released under the [Creative Commons Attribution-Share-Alike License 3.0](https://creativecommons.org/licenses/by-sa/3.0/)._</Text>
    </Fragment>
  )
  :
  (<Fragment></Fragment>)
);

export const run = render(
  <IssueGlance>
    <App />
  </IssueGlance>
);