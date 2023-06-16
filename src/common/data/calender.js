const events = [
  {
    id: 1,
    title: "Avaliable",
    start: new Date().setDate(new Date().getDate() + 1),
    className: "bg-success text-white",
  },
  {
    id: 2,
    title: "Available",
    start: new Date(),
    end: new Date(),
    className: "bg-success text-white",
  },
 
 
  
  {
    id: 3,
    title: "Booked",
    start: new Date().setDate(new Date().getDate()),
    className: "bg-danger text-white",
  },
 
  {
    id: 4,
    title: "Book To Prepare",
    start: new Date().setDate(new Date().getDate() - 5),
    end: new Date().setDate(new Date().getDate() - 3),
    className: "bg-warning text-white",
  },
];


const calenderDefaultCategories = [
  {
    id: 1,
    title: "Available",
    type: "bg-success",
  },

  {
    id: 2,
    title: "Book to prepare",
    type: "bg-warning",
  },
  {
    id: 3,
    title: "Book Date",
    type: "bg-danger",
  },
]

export { calenderDefaultCategories, events }
