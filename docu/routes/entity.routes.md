# Entity routes

## Prototype level
### create
#### Evaluation
type: post <br>
route: /eval <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>
#### Request
type: post <br>
route: /req <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>
#### Ride
type: post <br>
route: /ride <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>
#### Vehicle
type: post <br>
route: /vehicle <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>

### get
#### Evaluation (one)
type: get <br>
route: /eval/:id <br>
returns: Eval (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Evaluation (all)
type: get <br>
route: /evals <br>
returns: Eval[] (JSON)<br>
success status: 200 <br>
fail status: ? <br>
#### Request (one)
type: get <br>
route: /req/:id <br>
returns: Request (JSON)<br>
success status: 200 <br>
fail status: ? <br>
#### Request (all)
type: get <br>
route: /reqs <br>
returns: Request[] (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Ride (one)
type: get <br>
route: /ride/:id <br>
returns: Ride (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Ride (all)
type: get <br>
route: /rides <br>
returns: Rides[] (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Vehicle (one)
type: get <br>
route: /vehicle/:id <br>
returns: Vehicle (JSON)<br>
success status: 200 <br>
fail status: ? <br>
#### Vehicle (one)
type: get <br>
route: /vehicles <br>
returns: Vehicle[] (JSON)<br>
success status: 200 <br>
fail status: ? <br>

### delete
#### Evaluation
type: delete <br>
route: /eval/:id <br>
returns: Evaluation (JSON) <br>
success status: 200 <br>
fail status: 404, 
## Nice to have

### update

### tracking only if logged in and involved in the ride (accepted request)