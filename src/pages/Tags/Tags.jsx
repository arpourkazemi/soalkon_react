import React, { useEffect, useState } from "react";

import "./tags.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import TagsList from "./TagsList";
import axios from "axios";

const Tags = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const getAllTags = async () => {
    setLoading(true);
    await axios
      .get(`api/tag`)
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="main-bar">
          <h1 className="tags-h1">تگ ها</h1>
          <p className="tags-p label">
            تگ‌ها در وب‌سایت‌ها و متن‌ها برچسب‌هایی هستند که برای تشخیص و
            دسته‌بندی محتوا یا اطلاعات مورد استفاده قرار می‌گیرند. هدف از
            استفاده از تگ‌ها، سازماندهی و جستجوی سریع‌تر محتواها است.
          </p>
          <p className="tags-p label">
            استفاده از تگ درست باعث می‌شود که افراد مرتبط راحت تر سوال شما را
            پیدا کنند
          </p>
          <div className="tags-list-container">
            {tags.map((tag) => (
              <TagsList tag={tag} key={tag.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
