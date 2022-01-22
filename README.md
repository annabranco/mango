# Mango technical challenge

This is a coding exercise related to a techical challenge proposed by Mango.
<a href="https://github.com/annabranco/mango/raw/master/public/PruebaFEMangoReactV2.pdf">
See technical challenge description here.
</a>

## How to set it up

- Clone this repo

`$ git clone https://github.com/annabranco/mango.git`

- Install all dependencies using yarn

`$ yarn`

## Running on dev mode

Start development mode with the following command

`$ yarn dev`

The development mode will start a local server from where data will be obtained to feed the application.
As soon as the server is up, the app will be launched on port 8080.

If your browser does not open the app automatically, you may open it manually going to:

<a href="http://localhost:8080">http://localhost:8080</a>

## Running on normal mode

Start normal mode with the following command

`$ yarn start`

On normal mode, the local server will not be started. The app will try to reach the local server, and if it not running, no errors will occur and the app will run with default values.

## Running tests

To run automatic unit tests for the frontend and backend of the application, please run:

`$ yarn test`

When the tests are completed, a coverage report will be displayed.

## Running backend only

If for any reason you want to only run the local server, please use the command

`$ start:dev-server`

### Endpoints

The server will be up on the port 8081 and it will only accept GET calls

| Method | Endpoint | Response | Obs. |
|--------|----------|----------|------|
| GET | /health | 204 | Should respond with a 204 if server is running |
| GET | /normal-range | 200 | Should respond with a mocked value with min and max values |
| GET | /fixed-range | 200 | Should respond with a mocked value with an array of fixed values |

#### Response for /normal-range

```json
{
  "success": true,
    "data": {
      "min": 1,
      "max": 100,
      "jump": 10
    }
}
```

#### Response for /fixed-Range

```json
{
  "success": true,
    "data": {
      "fixed": [ 1, 2, 3 ]
    }
}
```

#### Server errors

Request errors are responded with an object of error and a key success set to false.

##### Example for 404 error response

```json
{
  "success": false,
  "error_code": 404,
  "error": "Not Found",
  "message": "The requested resource cannot be found."
}
```

## Using the \<Range> component

The \<Range> component was made to be reusable and easily adapted to other projects needs. It is fed with the following props:

- **changeCurrentMaxValue**

> a callback that is fired every time the maximum value is changed on the slider

- **changeCurrentMinValue**

> a callback that is fired every time the minimum value is changed on the slider

- **currentMaxValue**

> a number that returns the current maximum value for the slider. Its value should be changed on the parent component through the changeCurrentMaxValue callback

- **currentMinValue**

> a number that returns the current minimum value for the slider. Its value should be changed on the parent component through the changeCurrentMinValue callback

- **currentValue**

> a number that is returned only when the Range component is running with a SINGLE type. It returns the current value selected by the user and its value should be changed on the parent component through the onChange callback

- **displayMarks**

> a boolean that displays or hides the labels of the points that can be selected by the user on the slider

- **onChange**

> a callback that is fired every time the value is changed on the SINGLE type slider

- **type**

> a string that defined the type of selection that the user can make. It can be "SINGLE" for a single value or "RANGE" for selecting a minimum and a maximum value

- **unit**

> a string representing a visual sign of an unit that would be displayed beside the values' labels. For example "€"

- **values**

> An object feeding the values that should be displayed on the slider. It could be of fixed or normal types.

### Interface of fixed object

```typescript
{
  fixed: number[] // an array with the only numbers that can be selected by the user
}
```

### Interface of normal object

```typescript
{
  min: number; // the miminum value of the slider
  max: number; // the maximum value of the slider
  jump: number // the interval that the options jump from minimum to maxmimum values
}
```

## Known issues

There are currently some issues that could not be solved at this time. They are registered on this repo issues page:

<a href="https://github.com/annabranco/mango/issues">https://github.com/annabranco/mango/issues</a>


## Last words

I'd really appreciate any feedback that may help me solving the known issues or improve the code quality. Thank you!

<a href="https://www.linkedin.com/in/annabranco/">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png" width="50px">
</a>

[/annabranco/](https://www.linkedin.com/in/annabranco/)
