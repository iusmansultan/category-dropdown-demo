import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { GetCategories } from './helper/Backend';

function App() {
  const [options, setOptions] = useState([]);
  var c = 0;
  var [count, setCount] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    setLoading(true);
    const categories = await GetCategories();
    console.log(categories.data.data);
    const temp = categories.data.data.map((t) => {
      return { value: t.categoryId, label: t.name, children: t.children }
    })
    setOptions(temp);
    c++;
    setCount([...count, c]);
    setLoading(false);
  }


  if (loading) {
    return (
      <div>
        <div class="container mx-auto pt-10">
          <div class="w-[50%] h-[100px] m-auto bg-white border-2 border-gray-500 rounded-md">
            <div class="w-full h-[20px] p-2">
              <h2 class="text-[20px] font-medium">Choose Category:</h2>
              <h3 class="mr-6">Loading ......</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div class="container mx-auto pt-10">
      <div class="w-[50%] m-auto bg-white border-2 border-gray-500 rounded-md">
        <div class="w-full h-[20px] p-2">
          <h2 class="text-[20px] font-medium">Choose Category:</h2>
        </div>

        <div class="w-full p-4 mt-4">


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
