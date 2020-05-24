import { INQUIRY_ACTION_TYPES } from "../actions/inquiry.actions";

const initialState = {
    inquiries: [],
    loading: false,
    error: null

};

export const inquiry = (state = initialState, action) => {
    switch(action.type) {
        case INQUIRY_ACTION_TYPES.GETALL_INQUIRIES_REQUEST:
        return {
          loading: true
        };
  
      case INQUIRY_ACTION_TYPES.GETALL_INQUIRIES_SUCCESS:
          return {
            inquiries: action.payload
          };

      case INQUIRY_ACTION_TYPES.GETALL_INQUIRIES_FAILURE:
        return {
          error: action.payload
        };

      case INQUIRY_ACTION_TYPES.ADD_INQUIRY_REQUEST:
        return {
          ...state,
          addingInquiry: true
        };

      case INQUIRY_ACTION_TYPES.ADD_INQUIRY_SUCCESS:
        return {
            closePopups: true
        };

      case INQUIRY_ACTION_TYPES.ADD_INQUIRY_FAILURE:
        return {
          addInquiryError: action.payload
        };

      case INQUIRY_ACTION_TYPES.REPLY_INQUIRY_REQUEST:
        return {
          ...state,
          addingReply: true
        };
       
      case INQUIRY_ACTION_TYPES.REPLY_INQUIRY_SUCCESS:
        
        return {
          inquiries: state.inquiries.map((i) => {
            if(i._id === action.payload) {
              i.replied = true;
            }
            return i; 
          })
        };
        
      case INQUIRY_ACTION_TYPES.REPLY_INQUIRY_FAILURE:
        return {
          ...state,
          replyError: action.payload
        };  

      default:
        return state;
    }
};

