import { State } from "./generalTypes";

const initialState: State = {
    generalInfo: {
        name: "James The Dog",
        email: "woof@dog.com",
        phone: "5512345678",
    },
    education: [
        {
            school: "University of Pennsylvania",
            degree: "MBA",
            start_date: "2020-08-01",
            end_date: "2022-05-30",
            location: "Philadelphia, PA",
            id: crypto.randomUUID(),
        },
        {
            school: "MIT",
            degree: "B.S. Computer Science",
            start_date: "2015-08-01",
            end_date: "2019-05-30",
            location: "Boston, MA",
            id: crypto.randomUUID(),
        },
    ],
    experience: [
        {
            company: "Consulting Co.",
            position: "Consultant",
            start_date: "2022-10-01",
            end_date: "",
            location: "New York City, NY",
            responsibilities: [
            {id: crypto.randomUUID(), value: "Responsibility1"},
            {id: crypto.randomUUID(), value: "Responsibility2 this is a very long responsibility"},
            ],
            id: crypto.randomUUID(),
        },
        {
            company: "Consulting Co.",
            position: "Analyst",
            start_date: "2020-10-01",
            end_date: "2022-09-30",
            location: "New York City, NY",
            responsibilities: [{id: crypto.randomUUID(), value: "More Responsibility"}],
            id: crypto.randomUUID(),
        }
    ],
};

export default initialState;
