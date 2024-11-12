import React, { useState } from 'react';

function EmployeeTodoList() {
    return (
        <div class="container mt-4">
            <div class="d-flex justify-content-between">
                <h3 class="h5 font-weight-bold text-secondary">To-Do List</h3>
                <div class="d-flex mr-4">
                    <div class="mr-4">
                        <button type="button" class="btn btn-danger btn-sm px-4 py-2 text-white rounded-pill">Active</button>
                    </div>
                    <div> 
                        <button type="button" class="btn btn-outline-danger btn-sm px-4 py-2 text-danger rounded-pill">Completed</button>
                    </div>
                </div>
            </div>

            <ul class="mt-4 list-unstyled">
                <li class="d-flex justify-content-between border-bottom py-2 mb-2">
                    <span class="w-50 mb-3 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    <input type="checkbox" class="form-check-input" />
                </li>
                <li class="d-flex justify-content-between border-bottom py-2 mb-4">
                    <span class="w-50 mb-3 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    <input type="checkbox" class="form-check-input" />
                </li>
                <li class="d-flex justify-content-between border-bottom py-2 mb-4">
                    <span class="w-50 mb-3 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    <input type="checkbox" class="form-check-input" />
                </li>
                <li class="d-flex justify-content-between border-bottom py-2 mb-4">
                    <span class="w-50 mb-3 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    <input type="checkbox" class="form-check-input" />
                </li>
                <li class="d-flex justify-content-between py-2 mb-4">
                    <span class="w-50 mb-3 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                    <input type="checkbox" class="form-check-input" />
                </li>
            </ul>

            <div class="mb-4">
                <input placeholder="Enter Your Task" type="text" class="form-control form-control-sm mb-2" />
            </div>

            <div class="mb-6">
                <div class="d-flex justify-content-end mr-4">
                    <div class="mr-4">
                        <button type="button" class="btn btn-danger btn-sm px-4 py-2 rounded-pill"> Save</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-dark btn-sm px-4 py-2 rounded-pill">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EmployeeTodoList;
