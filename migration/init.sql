--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5

-- Started on 2022-09-19 20:45:05 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16392)
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    description character varying,
    createdat timestamp with time zone,
    location character varying,
    totalemployees integer DEFAULT 0,
    name character varying NOT NULL
);


ALTER TABLE public.department OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    id character varying NOT NULL,
    name character varying(50) NOT NULL,
    phone character varying,
    email character varying NOT NULL,
    address character varying,
    department character varying NOT NULL,
    createdat timestamp with time zone NOT NULL
);


ALTER TABLE public.employee OWNER TO postgres;



--
-- TOC entry 3174 (class 2606 OID 16401)
-- Name: department dep_pKey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT "dep_pKey" PRIMARY KEY (name);


--
-- TOC entry 3172 (class 2606 OID 16391)
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


-- Completed on 2022-09-19 20:45:05 UTC

--
-- PostgreSQL database dump complete
--

