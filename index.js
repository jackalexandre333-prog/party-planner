const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2609-Jack"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [];
let selectedEvent;

/** Updates state with all artists from the API */
async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    console.log(result.data);
    events = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

/** Updates state with a single artist from the API */
// async function getEvent(id) {
//   try {
//     const response = await fetch(API + "/" + id);
//     const result = await response.json();
//     console.log(result.data);
//     selectedArtist = result.data;
//     render();
//   } catch (error) {
//     console.error(error);
//   }
// }

// === Components ===

/** Artist name that shows more details about the artist when clicked */
function EventListItem(event) {
  const $eventItem = document.createElement("li");

  $eventItem.innerHTML = `
<li><a href="#selected">${event.name}</a></li>
`;
  $eventItem.addEventListener("click", () => getEvent(event.id));
  return $eventItem;
}

/** A list of names of all artists */
function EventList() {
  const $eventList = document.createElement("ul");
  //   $eventList.classList.add("lineup");
  const $event = events.map(EventListItem);
  $eventList.replaceChildren(...$event);
  return $eventList;
}

/** Detailed information about the selected artist */
function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an artist to learn more.";
    return $p;
  }
  const $event = document.createElement("section");
  $event.classList.add("event");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <figure>
      <img alt=${selectedEvent.name} src=${selectedEvent.imageUrl} />
    </figure>
    <p>${selectedEvent.description}</p>
  `;
}

// === Render ===
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
        <PartyDetails></PartyDetails>
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
