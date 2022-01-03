import React, {useState} from 'react';
import {ArrowCircleLeftIcon, ArrowCircleRightIcon} from '@heroicons/react/outline'
import Notification from "../Components/Notification";
// import {Inertia} from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { useForm } from '@inertiajs/inertia-react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function RadioQuestion({question, setValues, values}) {
  const {answers} = question;
  const name = `q${question.id}`;

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value,
    }))
  }

  return (
    <>
      <h3 className="text-xl font-bold leading-tight text-gray-900">{question.name}</h3>
      <fieldset className="space-y-5">
        <legend className="sr-only">{question.name}</legend>
        {answers.map((answer, idx) => {
          return (
            <label key={idx} className="flex flex-col cursor-pointer focus:outline-none">
              <div className="flex items-center text-sm">
                <input type="radio" name={name} value={answer.id} id={name}
                       className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                       onChange={handleChange}
                       required
                />
                {/*// <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->*/}
                <span className="ml-3 font-medium">{answer.name}</span>
              </div>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function CheckBoxQuestion({question, setValues, values}) {
  const {answers} = question;
  const name = `q${question.id}`;

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let arr = values[key] || [];
    if (e.target.checked) {
      arr.push(value);
    } else {
      arr = arr.filter(e => e !== value)
    }
    setValues(val => ({
      ...val,
      [key]: arr,
    }))
  }

  return (
    <>
      <h3 className="text-xl font-bold leading-tight text-gray-900">{question.name}</h3>
      <fieldset className="space-y-5">
        <legend className="sr-only">{question.name}</legend>
        {answers.map((answer, idx) => (
          <div className="relative flex items-start" key={idx}>
            <div className="flex items-center h-5">
              <input
                id={name + '-' + answer.id}
                name={name}
                value={answer.id}
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={name + '-' + answer.id} className="font-medium text-gray-700">
                {answer.name}
              </label>
              {/*<p id="comments-description" className="text-gray-500">*/}
              {/*  Get notified when someones posts a comment on a posting.*/}
              {/*</p>*/}
            </div>
          </div>
        ))}
      </fieldset>
    </>
  )
}

function TextQuestion({question, setValues, values}) {
  const name = `q${question.id}`;

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value,
    }))
  }

  return (
    <>
      <h3 className="text-xl font-bold leading-tight text-gray-900">{question.name}</h3>
      <legend className="sr-only">{question.name}</legend>
      <textarea
        rows="4"
        id={name}
        aria-describedby="answer-description"
        name={name}
        onChange={handleChange}
        value={values[name]}
        className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md my-3"
        required
      />
    </>
  )
}

export default function Lesson({course_id, lesson}) {

  // const [values, setValues] = useState({})
  // const { errors } = usePage().props
  const { data, setData, post, processing, errors } = useForm({})

  function handleBack() {
    window.history.back();
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (checkTextAnswers())
      post(route('lesson', [course_id, lesson.id]));
  }

  function checkTextAnswers() {
    //todo: check if text answers were not filled
    return true;
  }
  console.log(data, errors)

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mt-8 lg:mt-0">
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <header>
              <h1 className="text-3xl font-bold leading-tight text-gray-900">{lesson.name}</h1>
            </header>
            <main>
              <p className="text-gray-500">
                {lesson.detail_text}
              </p>
            </main>

            <div className="my-14">
              <h2 className="text-2xl font-bold leading-tight text-gray-900">Check questions</h2>
              <form onSubmit={handleSubmit}>
                {lesson.questions.map((item, idx) => {
                  let component;
                  switch (item.type) {
                    case 'radio':
                      component = <RadioQuestion question={item} setValues={setData} values={data}/>;
                      break;
                    case 'checkbox':
                      component = <CheckBoxQuestion question={item} setValues={setData} values={data}/>;
                      break
                    case 'text':
                      component = <TextQuestion question={item} setValues={setData} values={data}/>;
                      break;
                  }
                  return (
                    <div className="my-3" key={idx}>
                      {component}
                    </div>
                  )

                })}

                {errors.error && <div>{errors.error}</div>}
                {errors.error && <Notification position="bottom" type="fail" header="Fail" message="The answers are not right."/>}

                <div className="mt-5 flex">
                  <button type="button" className="mr-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm
                    font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={handleBack}
                  >
                    <ArrowCircleLeftIcon className="h-6 w-6"/> &nbsp;
                    Back
                  </button>
                  <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm
                    font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Check &nbsp;
                    <ArrowCircleRightIcon className="h-6 w-6"/>
                  </button>

                </div>
              </form>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
