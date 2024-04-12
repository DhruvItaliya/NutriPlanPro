import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
// import 'chartjs-adapter-moment';
import annotationPlugin from 'chartjs-plugin-annotation';
import logo from '../assets/login.jpg'
import { Line, Pie } from 'react-chartjs-2';
import Hero from './Hero';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

Chart.register(annotationPlugin);

const Home = () => {
    return (
        <div>
            <Hero/>
            <Testimonials/>
            <FAQ/>
        </div>
    );

}

export default Home