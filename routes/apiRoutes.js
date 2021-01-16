const db = require("../models");

// API routes
module.exports = (app) => {
    // getLastWorkout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).sort({ _id: -1 }).limit(1)
            .then((dbWorkout) => db.Workout.aggregate([
                {
                    $addFields: {
                        totalDuration: { $sum: "$exercises.duration" }
                    }
                }
            ])
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            }));
    });

    // addExercise to most recent workout
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.updateOne({ 
            _id: req.params.id 
        }, 
        { 
            $push: {
                exercises: req.body
            }
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    // createWorkout - new
    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // getWorkoutsInRange
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
            {
                $sort: { _id: -1 }
            },
            {
                $limit: 7
            },
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" },
                    totalPounds: { $sum: "$exercises.weight" }
                }
            },
            {
                $sort: { _id: 1 }
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
