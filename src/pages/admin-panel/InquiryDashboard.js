import React from "react";
import "../../styles/InquiryDashboardPage.css";

export default function InquiryDashboardPage() {
    return(
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
                <tr>
                    <td>M.M. Anjana Kumari</td>
                    <td>a@k.com</td>
                    <td>0763680290</td>
                    <td>Order didn't send.</td>
                    <td>Order didn't send. Order didn't send. Order didn't send. Order didn't send.</td>
                    <td>
                        <button>Reply</button>
                    </td>
                </tr>

                <tr>
                    <td>M.M. Anjana Kumari</td>
                    <td>a@k.com</td>
                    <td>0763680290</td>
                    <td>Order didn't send.</td>
                    <td>Order didn't send. Order didn't send. Order didn't send. Order didn't send.</td>
                    <td>
                        <button>Reply</button>
                    </td>
                </tr>

                <tr>
                    <td>M.M. Anjana Kumari</td>
                    <td>a@k.com</td>
                    <td>0763680290</td>
                    <td>Order didn't send.</td>
                    <td>Order didn't send. Order didn't send. Order didn't send. Order didn't send.</td>
                    <td>
                        <button>Reply</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}