import * as inquiryService from "../../services/inquiry.service";
import { displayToastAsync } from "./toast.actions";
import { NOTIFICATION_TYPE, buildNotification } from "../../helpers/notification.helper";

export const INQUIRY_ACTION_TYPES = {
    GETALL_INQUIRIES_REQUEST: "GETALL_INQUIRIES_REQUEST",
    GETALL_INQUIRIES_SUCCESS: "GETALL_INQUIRIES_SUCCESS",
    GETALL_INQUIRIES_FAILURE: "GETALL_INQUIRIES_FAILURE",

    ADD_INQUIRY_REQUEST: "ADD_INQUIRY_REQUEST",
    ADD_INQUIRY_SUCCESS: "ADD_INQUIRY_SUCCESS",
    ADD_INQUIRY_FAILURE: "ADD_INQUIRY_FAILURE",

    REPLY_INQUIRY_REQUEST: "REPLY_INQUIRY_REQUEST",
    REPLY_INQUIRY_SUCCESS: "REPLY_INQUIRY_SUCCESS",
    REPLY_INQUIRY_FAILURE: "REPLY_INQUIRY_FAILURE"
};

export function addInquiryAsync(inquiryDto) {
    return async (dispatch, getState) => {
      dispatch(request());
  
      const result = await inquiryService.addInquiry(inquiryDto);
  
      if(result.isResultOk()) {
        dispatch(success(result.data));
        dispatch(displayToastAsync(buildNotification("Added inquiry successfully", NOTIFICATION_TYPE.SUCCESS)));
        return true;
      } else {
        dispatch(failure(result.errorMessage));
        dispatch(displayToastAsync(buildNotification("Failed to add inquiry. Please try again", NOTIFICATION_TYPE.ERROR)));
        return false;
      }
    };
  
    function request() {
      return {
        type: INQUIRY_ACTION_TYPES.ADD_INQUIRY_REQUEST
      };
    }
  
    function success(payload) {
      return {
        type: INQUIRY_ACTION_TYPES.ADD_INQUIRY_SUCCESS,
        payload
      };
    }
  
    function failure(errorMsg) {
      return {
        type: INQUIRY_ACTION_TYPES.ADD_INQUIRY_FAILURE,
        payload: errorMsg
      };
    }
  };
  
  export function getAllInquiryAsync() {
    return async (dispatch, getState) => {
      dispatch(request());
      const { token } = getState().staffLogin.auth;
  
      const result = await inquiryService.getAllInquiry(token);
  
      if(result.isResultOk()) {
        dispatch(success(result.data));
      } else {
        failure(result.errorMessage);
      }
    };
  
    function request() {
      return {
        type: INQUIRY_ACTION_TYPES.GETALL_INQUIRIES_REQUEST
      };
    }
  
    function success(inquiries) {
      return {
        type: INQUIRY_ACTION_TYPES.GETALL_INQUIRIES_SUCCESS,
        payload: inquiries
      };
    }
  
    function failure(errorMsg) {
      return {
        type: INQUIRY_ACTION_TYPES.GETALL_INQUIRIES_FAILURE,
        payload: errorMsg
      };
    }
  };

  export function replyToInquiryAsync(inquiryDto) {
    return async (dispatch, getState) => {
      dispatch(request());

      const { token } = getState().staffLogin.auth;
  
      const result = await inquiryService.replyInquiry(token, inquiryDto);
  
      if(result.isResultOk()) {
        dispatch(success(inquiryDto.inquiryId));
        dispatch(displayToastAsync(buildNotification("Replied inquiry successfully", NOTIFICATION_TYPE.SUCCESS)));
        return true;
      } else {
        dispatch(failure(result.errorMessage));
        dispatch(displayToastAsync(buildNotification("Failed to reply inquiry. Please try again", NOTIFICATION_TYPE.ERROR)));
        return false;
      }
    };
  
    function request() {
      return {
        type: INQUIRY_ACTION_TYPES.REPLY_INQUIRY_REQUEST
      };
    }
  
    function success(payload) {
      return {
        type: INQUIRY_ACTION_TYPES.REPLY_INQUIRY_SUCCESS,
        payload
      };
    }
  
    function failure(errorMsg) {
      return {
        type: INQUIRY_ACTION_TYPES.REPLY_INQUIRY_FAILURE,
        payload: errorMsg
      };
    }
  };


  
  