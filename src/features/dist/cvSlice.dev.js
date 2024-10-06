"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.deleteCV = exports.fetchCVs = exports.uploadCVImage = exports.postCV = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var postCV = (0, _toolkit.createAsyncThunk)('cv/postCV', function _callee(cvData, _ref) {
  var rejectWithValue, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rejectWithValue = _ref.rejectWithValue;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:5000/api/v1/cv/', cvData, {
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", rejectWithValue(_context.t0.response.data));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Async thunk for uploading an image

exports.postCV = postCV;
var uploadCVImage = (0, _toolkit.createAsyncThunk)('cv/uploadCVImage', function _callee2(_ref2, _ref3) {
  var imageData, rejectWithValue, formData, response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          imageData = _ref2.imageData;
          rejectWithValue = _ref3.rejectWithValue;
          formData = new FormData();
          formData.append('image', imageData);
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:5000/api/users/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer ".concat(localStorage.getItem('token')) // Assuming you're storing token in localStorage

            }
          }));

        case 7:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](4);
          return _context2.abrupt("return", rejectWithValue(_context2.t0.response.data));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); // Async thunk for fetching CVs

exports.uploadCVImage = uploadCVImage;
var fetchCVs = (0, _toolkit.createAsyncThunk)('cv/fetchCVs', function _callee3(_, _ref4) {
  var rejectWithValue, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          rejectWithValue = _ref4.rejectWithValue;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:5000/api/v1/cv/'));

        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", rejectWithValue(_context3.t0.response.data));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Async thunk for deleting a CV

exports.fetchCVs = fetchCVs;
var deleteCV = (0, _toolkit.createAsyncThunk)('cv/deleteCV', function _callee4(cvId, _ref5) {
  var rejectWithValue;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          rejectWithValue = _ref5.rejectWithValue;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("http://localhost:5000/api/v1/cv/".concat(cvId)));

        case 4:
          return _context4.abrupt("return", {
            id: cvId
          });

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", rejectWithValue(_context4.t0.response.data));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // Create the CV slice

exports.deleteCV = deleteCV;
var cvSlice = (0, _toolkit.createSlice)({
  name: 'cv',
  initialState: {
    data: [],
    // Storing multiple CVs
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: function extraReducers(builder) {
    builder // Handle postCV lifecycle
    .addCase(postCV.pending, function (state) {
      state.loading = true;
      state.error = null;
    }).addCase(postCV.fulfilled, function (state, action) {
      state.loading = false;
      state.data.push(action.payload); // Add the new CV to the list
    }).addCase(postCV.rejected, function (state, action) {
      state.loading = false;
      state.error = action.payload;
    }) // Handle uploadCVImage lifecycle
    .addCase(uploadCVImage.pending, function (state) {
      state.loading = true;
    }).addCase(uploadCVImage.fulfilled, function (state, action) {
      state.loading = false; // Assuming the response contains the image URL, you can add it to the last CV added or update your logic accordingly

      if (state.data.length > 0) {
        var lastCvIndex = state.data.length - 1;
        state.data[lastCvIndex] = _objectSpread({}, state.data[lastCvIndex], {
          imageUrl: action.payload.imageUrl
        }); // Assuming response contains imageUrl
      }
    }).addCase(uploadCVImage.rejected, function (state, action) {
      state.loading = false;
      state.error = action.payload;
    }) // Handle fetchCVs lifecycle
    .addCase(fetchCVs.pending, function (state) {
      state.loading = true;
      state.error = null;
    }).addCase(fetchCVs.fulfilled, function (state, action) {
      state.loading = false;
      state.data = action.payload; // Replace the CV list with fetched data
    }).addCase(fetchCVs.rejected, function (state, action) {
      state.loading = false;
      state.error = action.payload;
    }) // Handle deleteCV lifecycle
    .addCase(deleteCV.pending, function (state) {
      state.loading = true;
    }).addCase(deleteCV.fulfilled, function (state, action) {
      state.loading = false;
      state.data = state.data.filter(function (cv) {
        return cv._id !== action.payload.id;
      }); // Remove deleted CV from list
    }).addCase(deleteCV.rejected, function (state, action) {
      state.loading = false;
      state.error = action.payload;
    });
  }
}); // Export the reducer to be used in the store

var _default = cvSlice.reducer;
exports["default"] = _default;