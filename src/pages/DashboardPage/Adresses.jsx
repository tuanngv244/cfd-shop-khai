import React from "react";
import { useSelector } from "react-redux";
import { authService } from "../../services/authService";
import useQuery from "../../hooks/useQuery";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";

const Adresses = () => {
  const { profile } = useSelector((state) => state.auth);
  const { data: provinceData } = useQuery(
    () =>
      profile?.province && authService.getDataProvinceById(profile?.province),
    [profile?.province]
  );
  const { data: districtData } = useQuery(
    () =>
      profile?.district && authService.getDataDistrictById(profile?.district),
    [profile?.district]
  );
  const { data: wardData } = useQuery(
    () => profile?.ward && authService.getDataWardById(profile?.ward),
    [profile?.ward]
  );
  // console.log("profile?.province", profile?.province);
  // console.log("provinceData", provinceData);
  // console.log("districtData", districtData);
  // console.log("wardData", wardData);
  const { firstName, email, phone } = profile || {};
  const address = `${profile?.street}, ${wardData?.name}, ${districtData?.name}, ${provinceData?.name}`;
  return (
    <div
      className="tab-pane fade active show"
      id="tab-address"
      role="tabpanel"
      aria-labelledby="tab-address-link"
    >
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Billing Address</h3>
              <p>
                <strong>Fullname:</strong> {firstName} <br />
                <strong>Email:</strong> {email} <br />
                <strong>Phone number:</strong> {phone} <br />
                <br />
                <Link to={PATHS.DASHBOARD.INDEX}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Shipping Address</h3>
              <p>
                {address} <br />
                <br />
                <Link to={PATHS.DASHBOARD.INDEX}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adresses;
