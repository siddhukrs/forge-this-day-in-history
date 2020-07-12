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
  const [events, setEvents] = useState(
    async () => {
      var dateTime = new Date(issueCreated);
      var month = (Number(dateTime.getMonth())+1).toString();
      var date = Number(dateTime.getDate());
      var allEvents = [];
      allEvents = allEvents.concat((await (await api.fetch("http://history.muffinlabs.com/date/" + month + "/" + date)).json()).data.Events);
      allEvents = allEvents.concat((await (await api.fetch("http://history.muffinlabs.com/date/" + month + "/" + (date+1)%28)).json()).data.Events);
      allEvents = allEvents.concat((await (await api.fetch("http://history.muffinlabs.com/date/" + month + "/" + (date+2)%28)).json()).data.Events);
      allEvents = allEvents.concat((await (await api.fetch("http://history.muffinlabs.com/date/" + month + "/" + (date-1)%28)).json()).data.Events);
      allEvents = allEvents.concat((await (await api.fetch("http://history.muffinlabs.com/date/" + month + "/" + (date-2)%28)).json()).data.Events);

      var subset = [];
      allEvents.forEach(event => {
        if (Number(event.year) >= Number(new Date(issueCreated).getFullYear())) {
          subset.push({year: Number(event.year), text: event.text, link: event["links"][0]["link"]});
        }
      });;
      return subset;
    },
    []
  );
  return (
      <EventList dateTime={issueCreated} events={events.sort(function(a,b){return a.year-b.year})} length={events.length}/>
  );
};

const EventList = ({dateTime, events, length}) => (
  length > 0 ?
  (
    <Fragment>
        <Text>__{new Date(dateTime).toDateString()}__</Text>
        <Text>__[{new Date(dateTime).getFullYear()}](#)__: This issue was filed.</Text>
        {events.map(event => (
            <Text>__[{event.year}]({event.link})__: {event.text}</Text>
        ))}
        <Text> __[{new Date().getFullYear()}](#)__: This issue is still open! </Text>
        <Text>_This page uses material from Wikipedia, which is released under the [Creative Commons Attribution-Share-Alike License 3.0](https://creativecommons.org/licenses/by-sa/3.0/)._</Text>
    </Fragment>
  )
  :
  (<Fragment>
    <Text>This issue was filed fairly recently. Please check back in a few months for your dose of trivia :)</Text>
  </Fragment>)
);

export const run = render(
  <IssueGlance>
    <App />
  </IssueGlance>
);