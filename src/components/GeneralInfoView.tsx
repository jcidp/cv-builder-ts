import { GeneralInfoInterface } from "../helpers/generalTypes";

function GeneralInfoView({name, email, phone}: GeneralInfoInterface) {
    return (<section className="generalInfo">
        <h2>{name}</h2>
        <a>{email}</a>
        <span>{phone}</span>
    </section>)
}

export default GeneralInfoView;