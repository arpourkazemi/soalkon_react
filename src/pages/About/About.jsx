import React, { useEffect } from "react";
import { gsap } from "gsap";

import "./About.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";

const About = () => {
  //gsap
  useEffect(() => {
    gsap.fromTo(
      "li",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.15,
      }
    );
  }, []);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <h1 className="about-h3" style={{ marginTop: "100px" }}>
          سوال کن
        </h1>
        <p className="about-p">
          سوال کن یک برنامه در محور پرسش و پاسخ سوالات با رویکرد مالی است. این
          برنامه از بخش های مختلفی اعم از سمت سرور، سمت کاربر و هوش مصنوعی ایجاد
          شده است. اعضای تیم اجرای این پروژه: پوریا علیان نژادی، امیررضا
          پورکاظمی، یحیی ملکی و امین پسندیده هستند.
        </p>
        <p className="about-p">در این وب‌سایت، ویژگی‌های زیر اضافه شده‌اند:</p>
        <ul>
          <li className="about-p">
            <span className="keyword">احراز هویت</span> کاربر (ورود / ثبت نام).
          </li>
          <li className="about-p">
            پرسش <span className="keyword">سوالات.</span>
          </li>
          <li className="about-p">
            <span className="keyword">جستجو</span> برای سوالات.
          </li>
          <li className="about-p">
            قابلیت <span className="keyword">رای دادن</span> به سوالات و{" "}
            <span className="keyword">حذف</span> سوالات.
          </li>
          <li className="about-p">
            صفحات <span className="keyword">پروفایل فردی</span> با امکان انتخاب
            آواتار.
          </li>
          <li className="about-p">
            به هر کاربر پروفایل یک{" "}
            <span className="keyword">آواتار تصادفی</span> اختصاص می‌یابد که
            کاربر قادر به تغییر آن است.
          </li>
          <li className="about-p">
            نمایش <span className="keyword">تگ ها</span> برای جستجوی آسان تر و
            دسته بندی مرتب تر سوالات.
          </li>
          <li className="about-p">
            نمایش <span className="keyword">سوالات برتر</span> جهت دسترسی راحت
            تر به سوالات محبوب و پرتکرار
          </li>
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default About;
