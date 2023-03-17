import React, { useState } from "react";
import { Breadcrumb } from "antd";
import { useRouter } from "next/router";

const IndicatorBreadcrumbEmployee = () => {
  const { asPath } = useRouter();
  const { Item } = Breadcrumb;

  const arrAsPath = asPath.split('/');
  const ucwords = (str : string) : any => {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb style={{ margin: "16px 0" }}>
        {arrAsPath.map((value, index) => {
          return (index > 0 ? <Item>{ucwords(value)}</Item> : '')
        })}
      </Breadcrumb>
    </>
  );
};

export default IndicatorBreadcrumbEmployee;