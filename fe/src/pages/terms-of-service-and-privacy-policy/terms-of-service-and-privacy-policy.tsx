import './terms-of-service-and-privacy-policy.css';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";

function Terms() {
    const navigate = useNavigate()
    return (
        <div className="terms">
            <Link onClick={() => navigate('/')}>Go back</Link>
            <h1 className="terms-h1">Terms of Service and Privacy Policy</h1>
            <b>Effective Date: 14 Dec 2024</b>
            <p>
                Welcome to TODODO, a Telegram mini-application for managing your daily tasks. By using TODODO, you agree
                to the following Terms of Service and Privacy Policy. Please read them carefully.
            </p>
            <hr/>
            <h2>Terms of Service</h2>
            <h4>1. Acceptance of Terms</h4>
            <p>
                By accessing or using TODODO, you acknowledge that you have read, understood, and agree to be bound by
                these Terms of Service. If you do not agree to these terms, please do not use the application.
            </p>
            <h4>2. Description of Service</h4>
            <p>
                TODODO is a Telegram mini-application designed to help you create, read, update, and delete (CRUD) daily
                tasks. The service is provided "as is" and "as available."
            </p>
            <h4>3. User Responsibilities</h4>
            <ul>
                <li>
                    You are responsible for all activities that occur under your account. You are solely responsible
                    for
                    your account and any actions taken under your account.
                </li>
                <li>
                    You agree to use TODODO only for lawful purposes and in compliance with all applicable laws and
                    regulations.
                </li>
            </ul>
            <h4>4. Prohibited Activities</h4>
            <p>
                When using TODODO, you agree not to:
                <ul>
                    <li>Use the application for any illegal, harmful, or fraudulent activities.</li>
                    <li>Interfere with or disrupt the application’s operation or its servers.</li>
                    <li>Attempt to access or manipulate other users’ data.</li>
                </ul>
            </p>
            <h4>5. Modification of Terms</h4>
            <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                upon posting. Your continued use of TODODO after any modifications indicates your acceptance of the
                revised terms.
            </p>
            <h4>6. Termination</h4>
            <p>
                We may terminate or suspend your access to TODODO at our sole discretion, without prior notice, if we
                believe you have violated these Terms of Service.
            </p>
            <h4>7. Limitation of Liability</h4>
            <p>
                TODODO is provided on an "as-is" basis. To the maximum extent permitted by law, we are not liable for
                any damages, including but not limited to direct, indirect, incidental, or consequential damages,
                arising from your use of the application.
            </p>
            <hr/>
            <h2>Privacy Policy</h2>
            <h4>1. Information We Collect</h4>
            <ul>
                <li>
                    <b>Telegram User Information:</b> When you use TODODO, we collect your Telegram User data (ID,
                    username, etc.) to identify and personalize your tasks.
                </li>
                <li>
                    <b>Task Data:</b> We collect and store the tasks you create, update, or delete within TODODO.
                </li>
            </ul>
            <h4>2. How We Use Your Information</h4>
            <ul>
                <li>To provide, maintain, and improve the functionality of TODODO.</li>
                <li>To personalize your experience and store your task data.</li>
                <li>To communicate with you about updates or changes to the application.</li>
            </ul>
            <h4>3. Data Storage and Security</h4>
            <ul>
                <li>
                    Your data is stored securely on our servers. We implement reasonable technical and organizational
                    measures to protect your information from unauthorized access, loss, or misuse.
                </li>
                <li>
                    While we strive to protect your data, no method of transmission over the internet or electronic
                    storage is 100% secure. We cannot guarantee absolute security.
                </li>
            </ul>
            <h4>4. Data Sharing</h4>
            <ul>
                <li>We do not sell, trade, or rent your personal information to third parties.</li>
                <li>We may disclose your information if required by law or to protect our rights</li>
            </ul>
            <h4>5. Data Retention</h4>
            <p>
                We retain your data as long as you use TODODO. If you stop using the application, you can contact us to
                request the deletion of your data.
            </p>
            <h4>6. Your Rights</h4>
            <ul>
                <li>
                    You have the right to access, update, or delete your data. To exercise these rights, contact us at
                    !![Insert Contact Information]!!.
                </li>
                <li>You can stop using TODODO at any time, which will cease further data collection.</li>
            </ul>
            <h4>7. Third-Party Links</h4>
            <p>
                TODODO may include links to third-party websites or services. We are not responsible for the privacy
                practices or content of these external sites.
            </p>
            <h4>8. Children’s Privacy</h4>
            <p>
                TODODO is not intended for use by individuals under the age of 13. We do not knowingly collect personal
                information from children under 13. Since we do not collect age data during login, we rely on users to
                comply with this requirement. If we become aware that a user under 13 has provided personal information,
                we will take steps to delete such information promptly.
            </p>
            <h4>9. Changes to Privacy Policy</h4>
            <p>
                We may update this Privacy Policy from time to time. Changes will be effective upon posting. We
                encourage you to review this page periodically.
            </p>
            <hr/>
            <h2>Contact Us</h2>
            <p>
                If you have any questions or concerns about these Terms of Service or Privacy Policy, please contact us
                at:
            </p>
            <p><b>Email:</b> [Insert Email Address]</p>

            <i>Thank you for using TODODO!</i>
        </div>
    )
}

export default Terms
