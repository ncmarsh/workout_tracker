const db = require("../models");

// API routes
module.exports = (app) => {
    // getLastWorkout - retrieve
    app.get("/api/workouts", (req, res) => {

    });

    // addExercise - update
    app.put("/api/workouts/:id", (req, res) => {

    });

    // createWorkout - create
    app.post("/api/workouts", (req, res) => {
        
    });

    // getWorkoutsInRange - retrieve
    // app.get("/api/workouts/range", (req, res) => {
    //     db.Workout.find({}, (err, dbWorkout) => {
    //         if (err) {
    //             console.log(err);
    //             res.send(err);
    //         } else {
    //             // console.log(dbWorkout);
    //             console.log(dbWorkout[0].exercises);
    //             console.log(dbWorkout[1].exercises);
    //             console.log(dbWorkout[2].exercises);
    //             console.log(dbWorkout[3].exercises);
    //             console.log(dbWorkout[4].exercises);
    //             console.log(dbWorkout[5].exercises);
    //             console.log(dbWorkout[6].exercises);
    //             console.log(dbWorkout[7].exercises);
    //             console.log(dbWorkout[8].exercises);
    //             res.json(dbWorkout);
    //         }
    //     });
    // });
    // app.get("/api/workouts/range", (req, res) => {
    //     db.Workout.find({})
    //         .then(dbWorkout => {
    //             console.log(dbWorkout);
    //             res.json(dbWorkout);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // });
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
                {
                    $addFields: {
                        totalDuration: { $sum: "$exercises.duration" },
                        totalPounds: { $sum: "$exercises.pounds" }
                    }
                },
                {
                    $limit: 7
                }
            ])
            .then(dbWorkout => {
                console.log(dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
};
