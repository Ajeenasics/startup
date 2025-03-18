const Event = require("./eventSchema");
const EventRegistration = require("./eventRegistrations");
const EntEventRegister = require("./entEventRegisterSchema");
// const { default: EntRegisterEvents } = require("../../client/src/Entreprenuer/Events/EntRegisterEvents");
// Add a new event
const addEvent = async (req, res) => {
  try {
    const { title, description, time, date, venue } = req.body;

    const newEvent = new Event({
      title,
      description,
      time,
      date,
      venue,
    });

    newEvent
      .save()
      .then((data) => {
        res.status(200).json({
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Data not Inserted",
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all events
const viewEvents = (req, res) => {
  Event.find({ isActive: true })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// View all events
const viewEventsById = (req, res) => {
  Event.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// Delete events
const removeEventById = (req, res) => {
  Event.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          msg: "Data deleted successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "Something went Wrong",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// Add a new event registration
const addEventRegistration = async (req, res) => {
  try {
    const { entId, mentorId, investorId, eventId, date, userRole } = req.body;

    const newEventRegistration = new EventRegistration({
      entId,
      mentorId,
      investorId,
      eventId,
      date,
      userRole,
    });

    newEventRegistration
      .save()
      .then((data) => {
        res.status(200).json({
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Data not Inserted",
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all event registrations
const viewEventRegistrations = (req, res) => {
  EventRegistration.find()
    .populate("entId mentorId investorId eventId") // populate referenced fields
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// View event registrations by Event ID
const viewEventRegistrationsByEventId = (req, res) => {
  const { eventId } = req.params;
  EntEventRegister.find({ eventId })
    .populate("entId eventId") // populate referenced fields
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

const viewEventRegistratiobyentid = (req, res) => {
    const { eventId } = req.params;
    EntEventRegister.find({ entId : eventId })
      .populate("entId eventId") // populate referenced fields
      .exec()
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json({
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.status(200).json({
            msg: "No Data obtained",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: "Data not obtained",
          Error: err,
        });
      });
  };

  
// Entreprneur Event Register

const registerEventEntrepreneur = (req, res) => {
    const { fname, lname, email, contact, location, entId, eventId } = req.body;
  
    const newEventReg = new EntEventRegister({
      fname,
      lname,
      email,
      contact,
      location,
      entId,
      eventId,
    });
  
    newEventReg
      .save()
      .then((data) => {
        res.status(200).json({
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Data not inserted",
          error: err,
        });
      });
  };

// View All Event Registration

const viewEventRegistration = (req, res) => {
  EntEventRegister.find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

module.exports = {
  addEvent,
  viewEvents,
  addEventRegistration,
  viewEventRegistrations,
  viewEventRegistrationsByEventId,
  viewEventsById,
  removeEventById,
  registerEventEntrepreneur,
  viewEventRegistration,viewEventRegistratiobyentid
};
