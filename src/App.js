import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { GetCategories } from './helper/Backend';

function App() {
  const [options, setOptions] = useState([]);
  var c = 0;
  var [count, setCount] = useState([]);

  useEffect(() => {
    getCategories("null");
  }, [])

  const getCategories = async (id) => {
    const categories = await GetCategories(id);
    console.log(categories.data.data);
    const temp = categories.data.data.map((t) => {
      return { value: t.categoryId, label: t.name, children: t.children }
    })
    setOptions(temp);
    c++;
    setCount([...count, c]);
  }

  return (
    <div class="container mx-auto pt-10">
      <div class="w-[50%] m-auto h-[300px] bg-white border-2 border-gray-500 rounded-md">
        <div class="w-full h-[20px] p-2">
          <h2 class="text-[20px] font-medium">Choose Category:</h2>
        </div>

        <div class="w-full p-4 mt-4">
          {/* <Select
            options={options}
            onChange={(e) => {
              console.log(e);
              const temp = e.children.map((t) => {
                return {
                  options: {
                    value: t.categoryId,
                    label: t.name
                  },
                  children: t.children
                }
              })
              setSelected(temp);
            }}
          /> */}

          {
            count.map((i) => (
              <div style={{ marginBottom: "10px" }}>
                <Select
                  onChange={(e) => {
                    const temp = e.children.map((t) => {
                      return { value: t.categoryId, label: t.name, children: t.children }
                    })
                    setOptions(temp);
                    if (temp.children !== []) {
                      c++;
                      setCount([...count, c]);
                    }
                  }}
                  options={options}
                  isSearchable
                  placeholder="Select Category..."
                />

              </div>
            ))}

        </div>

      </div>

    </div>
  );
}

export default App;
