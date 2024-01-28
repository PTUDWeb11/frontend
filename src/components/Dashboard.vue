<template>
    <div class="dashboard">
        <main id="main" class="main">
        
            <section class="section dashboard">
            <div class="row">

                <div class="col-12">
                <div class="row">

                    <!-- Product Card -->
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card sales-card">

                        <div class="card-body">
                        <h5 class="card-title">Product number <span></span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-cart"></i>
                            </div>
                            <div class="ps-3">
                            <span class="text-muted small pt-2 ps-1">Total: </span> <span class="text-success small pt-1 fw-bold">{{ totalProducts }}</span>
                            </div>
                        </div>
                        </div>

                    </div>
                    </div><!-- End product Card -->

                    <!-- Balance Card -->
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card revenue-card">

                        <div class="card-body">
                        <h5 class="card-title">Balance</h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-currency-dollar"></i>
                            </div>
                            <div class="ps-3">
                            <span class="text-muted small pt-2 ps-1">Current: </span> <span class="text-success small pt-1 fw-bold">$3,264</span>
                            </div>
                        </div>
                        </div>

                    </div>
                    </div><!-- End Revenue Card -->

                    <!-- Users Card  Card -->
                    <div class="col-xxl-4 col-xl-12">

                    <div class="card info-card customers-card">

                        <div class="card-body">
                        <h5 class="card-title">Customers <span></span></h5>
                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-people"></i>
                            </div>
                            <div class="ps-3">
                            <span class="text-muted small pt-2 ps-1">Total: </span> <span class="text-danger small pt-1 fw-bold"> {{ totalUsers }}</span>
                            </div>
                        </div>

                        </div>
                    </div>

                    </div><!-- End Users Card -->

                     <!-- Reports -->
                    <div class="col-12">
                    <div class="card overflow-auto">
                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body card-chart">
                        <h5 class="card-title">Reports <span>/Today</span></h5>

                        <!-- Line Chart -->
                        <div id="chart"></div>
                        <!-- End Line Chart -->

                        </div>

                    </div>
                    </div><!-- End Reports -->
                </div>
                </div><!-- End Left side columns -->
            </div>
            </section>

        </main><!-- End #main -->

        
    </div>
</template>

<script>
// Import your assets 
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
//import './assets/css/style.css';
// Vendor JS Files 

import ApexCharts from 'apexcharts'
import { useUserStore } from '@/stores/user.js';
import config from '@/config';

export default {
    data() {
        return {
            totalProducts: 0,
            totalUsers: 0,
            productsAdded: [],
            usersRegistered: []
        };
    },

    async mounted() {
        const userStore = useUserStore();
        const token = userStore.token;

        const responseProducts = await fetch(`${config.APIEndpoint}/admin/products/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const dataProducts = await responseProducts.json();
        this.totalProducts = dataProducts.data.total;
        this.productsAdded = dataProducts.data.stats.map(item => ({
            date: item.date,
            count: parseInt(item.count, 10)
        }));

        const responseUsers = await fetch(`${config.APIEndpoint}/admin/users/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const dataUsers = await responseUsers.json();
        this.totalUsers = dataUsers.data.total;
        this.usersRegistered = dataUsers.data.stats.map(item => ({
            date: item.date,
            count: parseInt(item.count, 10)
        }));


        // Mock data
        //const productsAdded = [
        //    { date: "2022-01-01T00:00:00.000Z", count: 10 },
        //    { date: "2022-01-02T00:00:00.000Z", count: 15 },
        //    { date: "2022-02-01T00:00:00.000Z", count: 20 },
        //    { date: "2022-02-02T00:00:00.000Z", count: 45 },
        //    { date: "2022-03-01T00:00:00.000Z", count: 60 },
        //    { date: "2022-03-02T00:00:00.000Z", count: 155 },
        //    { date: "2022-05-01T00:00:00.000Z", count: 160 },
        //    { date: "2024-01-20", count: 16 },
        //];

        //const usersRegistered = [
        //    { date: "2022-01-01T00:00:00.000Z", count: 5 },
        //    { date: "2022-02-02T00:00:00.000Z", count: 45 },
        //    { date: "2022-03-01T00:00:00.000Z", count: 60 },
        //    { date: "2022-03-02T00:00:00.000Z", count: 155 },
        //    { date: "2022-04-02T00:00:00.000Z", count: 7 },
        //    // More data...
        //];

        new ApexCharts(document.querySelector("#chart"), {
            series: [{
                name: 'Products Added',
                data: this.productsAdded.map(item => ({ x: item.date, y: item.count })),
            }, {
                name: 'Users Registered',
                data: this.usersRegistered.map(item => ({ x: item.date, y: item.count })),
            }],
            chart: {
                height: 380,
                type: 'area',
                toolbar: {
                    show: true
                },
            },
            markers: {
                size: 5
            },
            colors: ['#4154f1', '#ff771d'],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            }
        }).render();
    }
};
</script>

<style scoped>
/* Import CSS files here */
@import './assets/vendor/bootstrap/css/bootstrap.min.css';
@import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
@import './assets/css/style.css';
/* More imports... */

#chart {
  max-width: 1000px;
  margin: 35px auto;
}
</style> 