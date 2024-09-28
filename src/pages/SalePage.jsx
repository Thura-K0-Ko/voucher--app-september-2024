import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";

// import VoucherInfo from "../components/VoucherInfo";
import VoucherInfo2 from "../components/VoucherInfo2";

const SalePage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentPageTitle={"Sale Module"} />
        <VoucherInfo2 />
      </Container>
    </section>
  );
};

export default SalePage;
