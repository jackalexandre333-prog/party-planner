const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2609-Jack";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Failed to fetch selected event");
    }
    const result = await response.json();
    console.log(result.data);
    events = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    if (!response.ok) {
      throw new Error("Failed to fetch selected event");
    }
    const result = await response.json();
    console.log(result.data);
    selectedEvent = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function EventListItem(event) {
  const $eventItem = document.createElement("li");
  const $link = document.createElement("a");
  $link.href = "#selected";
  $link.textContent = event.name;
  $eventItem.append($link);
  $eventItem.addEventListener("click", () => {
    getEvent(event.id);
  });
  return $eventItem;
}

function EventList() {
  const $eventList = document.createElement("ul");
  const $event = events.map(EventListItem);
  $eventList.replaceChildren(...$event);
  return $eventList;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("event");

  const $name = document.createElement("h3");
  $name.textContent = `${selectedEvent.name} #${selectedEvent.id}`;

  const $date = document.createElement("p");
  $date.textContent = selectedEvent.date.split("T")[0];

  const $location = document.createElement("p");
  $location.textContent = selectedEvent.location;

  const $description = document.createElement("p");
  $description.textContent = selectedEvent.description;

  $event.append($name, $date, $location, $description);

  return $event;
}

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Lineup</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;

  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
