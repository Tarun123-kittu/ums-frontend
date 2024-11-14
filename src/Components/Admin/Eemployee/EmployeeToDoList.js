import React, { useState } from 'react';
import './employeeDashboard.css'
function EmployeeTodoList() {
    return (
        <div class="">
            
            <div class="d-flex justify-content-between pb-2">
                <h3 className="heading-h3">
                To-Do List
            </h3>
                <div class="d-flex mr-4">
                    <div class="mr-4">
                        <button type="button" class="btn btn-danger btn-sm px-4 py-2 text-white rounded-pill">Active</button>
                    </div>
                    <div> 
                        <button type="button" class="btn btn-outline-danger btn-sm px-4 py-2 text-danger rounded-pill">Completed</button>
                    </div>
                </div>
            </div>

            <ul class="pt-6 list-unstyled">
    <li class="d-flex justify-content-between pb-3">
        <label class="form-check-label" for="flexCheckDefault1">
            <p className="to-do-text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
        </div>
    </li>
    <li class="d-flex justify-content-between pb-3">
        <label class="form-check-label" for="flexCheckDefault2">
            <p className="to-do-text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
        </div>
    </li>
    <li class="d-flex justify-content-between pb-3">
        <label class="form-check-label" for="flexCheckDefault3">
            <p className="to-do-text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
        </div>
    </li>
    <li class="d-flex justify-content-between pb-3">
        <label class="form-check-label" for="flexCheckDefault4">
            <p className="to-do-text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault4" />
        </div>
    </li>
    <li class="d-flex justify-content-between pb-3">
        <label class="form-check-label" for="flexCheckDefault5">
            <p className="to-do-text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault5" />
        </div>
    </li>
    <li class="d-flex justify-content-between pb-3">
        <label class="form-check-label" for="flexCheckDefault5">
            <p className="to-do-text">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault5" />
        </div>
    </li>
</ul>


            <div class="mb-4">
            <textarea rows="2" class=" to-do-input form-control" id="exampleFormControlTextarea1" placeholder="Enter your to-do task..."></textarea>
            </div>

            <div class="">
                <div class="d-flex justify-content-end ">
                
                        <button type="button" class="all-btn-black">Cancel</button>
                        <button type="button" class="all-btn-red"> Save</button>
                  
                </div>
            </div>
        </div>

    );
}

export default EmployeeTodoList;
