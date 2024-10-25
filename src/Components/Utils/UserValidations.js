import toast from "react-hot-toast";
import validator from "validator";

const UserValidations = (
    name,
    email,
    mobile,
    emergency_contact_relationship,
    emergency_contact_name,
    emergency_contact,
    bank_name,
    account_number,
    ifsc,
    increment_date,
    gender,
    dob,
    doj,
    skype_email,
    ultivic_email,
    salary,
    security,
    total_security,
    installments,
    position,
    department,
    status,
    username,
    password,
    confirm_password,
    selected_role,
    address,
    selectedDocuments
) => {
    // Sequential validation: return the first error
    if (name === "") {
        toast.error("Name is required !!");
        return { name: "Name is required !!" };
    }
    if (email === "") {
        toast.error("Email is Required !!");
        return { email: "Email is required !!" };
    } else if (!validator.isEmail(email)) {
        toast.error("Looks like you're missing '@' or '.com' in the email address.");
        return { email: "Email is not valid !!" };
    }
    if (mobile === "") {
        toast.error("Mobile number is Required !!");
        return { mobile: "Mobile is required!!" };
    } else {
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobile)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return { mobile: "Mobile number must be 10 digits long!!" };
        }
    }

    if (emergency_contact) {
        const emergencyContactRegex = /^[0-9]{10}$/;
        if (!emergencyContactRegex.test(emergency_contact)) {
            toast.error("Emergency contact must be a valid 10-digit mobile number.");
            return { emergency_contact: "Emergency contact must be 10 digits long!!" };
        }
    }

    if (increment_date) {
        const today = new Date();
        const incrementDate = new Date(increment_date);
        today.setHours(0, 0, 0, 0);

        if (incrementDate < today) {
            toast.error("Increment date must not be less than today.");
            return { increment_date: "Increment date must be later!" };
        }
    }

    if (gender === "") {
        toast.error("Please select gender!!");
        return { gender: "Gender is required!!" };
    }
    if (!dob) {
        toast.error("Please Select Date of Birth");
        return { dob: "Date Of Birth is required!!" };
    }
    if (!doj) {
        toast.error("Please Select Date of Joining");
        return { doj: "Date Of Joining is required!!" };
    }
    if (skype_email && !validator.isEmail(skype_email)) {
        toast.error("Skype email is not valid : missing '@' or '.com' in the email address.");
        return { skype_email: "Invalid Skype email!" };
    }

    if (ultivic_email && !validator.isEmail(ultivic_email)) {
        toast.error("Ultivic email is not valid : missing '@' or '.com' in the email address.");
        return { ultivic_email: "Invalid Ultivic email!" };
    }

    if (!position) {
        toast.error("Please Select Position");
        return { position: "Position is required!!" };
    }
    if (!department) {
        toast.error("Please Select Technology/Department");
        return { department: "Department is required!!" };
    }
    if (!status) {
        toast.error("Please Select Status ");
        return { status: "Status is required!!" };
    }
    if (username === "") {
        toast.error("Please Enter Username");
        return { username: "Username is required!!" };
    }
    if (password === "") {
        toast.error("Please Enter password");
        return { password: "Password is required!!" };
    }
    if (confirm_password === "") {
        toast.error("Please Enter confirm_password");
        return { confirm_password: "Confirm password is required!!" };
    }
    if (!selected_role) {
        toast.error("Please Select Role");
        return { role: "Role is required!!" };
    }
    if (address === "") {
        toast.error("Please Enter address");
        return { address: "Address is required!!" };
    }





    return {};
};

export default UserValidations;
