import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const AddCourseForm = () => {



    return (
        <>
            <div className='container my-5'>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Course Name : </label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Topic Names : </label>
                        <input type="text" class="form-control" id="exampleInputPassword1" />
                    </div>


                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddCourseForm