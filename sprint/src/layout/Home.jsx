import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../node_modules/materialize-css/dist/js/materialize.min.js";
import Navbar from "./Navbar";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const [projectID, setProjectID] = useState(2);
  const [project, setProject] = useState();

  const fetchData = async () => {
    try {
      const project = axios.get(
        `https://webapi-sprintchallenge-vh.herokuapp.com/api/project/${projectID}`
      );
      setProject(project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(project);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <ProjectCard {...project} />
      </div>
    </>
  );
};

export default Home;
