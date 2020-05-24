import React, { useEffect } from "react";
import "../../styles/InquiryDashboardPage.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllInquiryAsync } from "../../redux/actions/inquiry.actions";
import { POPUP_KEYS } from "../../constants";
import { openPopup } from "../../redux/actions/popup.actions";

export default function InquiryDashboardPage() {
  const dispatch = useDispatch();
  const inquiry = useSelector((state) => state.inquiry);
  useEffect(() => {
    dispatch(getAllInquiryAsync());
  }, []);

  const toggleDisplayInquiryForm = (i) => {
    dispatch(openPopup(POPUP_KEYS.REPLY_INQUIRY_POPUP, { inquiryItem: i }));
  };

  return (
    <div className="inquiry-table-wrapper">
      <table className="inquiry-table">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Subject</th>
          <th>Description</th>
          <th>Reply</th>
        </tr>
        {inquiry.inquiries &&
          inquiry.inquiries.map((i) => (
            <tr>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.phone}</td>
              <td>{i.subject}</td>
              <td>{i.description}</td>
              <td>
                <button onClick={() => toggleDisplayInquiryForm(i)}>
                  Reply
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
