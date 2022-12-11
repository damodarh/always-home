import React, { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { setAlert } from "../../../actions/alert";
import PropTypes from "prop-types";
import AlwaysHomeModal from "../../AlwaysHomeModal/AlwaysHomeModal";

