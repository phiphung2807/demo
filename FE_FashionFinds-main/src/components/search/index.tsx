import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { IProduct } from "../../interface/Product"
import { useForm } from 'react-hook-form'
import { getProductSearch } from "../../api/Product"
const Search = () => {
    const { register, handleSubmit } = useForm();
    const [product, setProduct] = useState<IProduct[]>([])
    const [keyword, setKeyWord] = useState<string>('')
    const [isSearch, setIsSearch] = useState(false)

    const onHandlesSearch = async () => {
        const { data } = await getProductSearch(keyword, 3);
        setProduct(data.productResponse.docs);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await getProductSearch(keyword, 3);
            setProduct(data.productResponse.docs);
        };
        fetchProducts();
    }, [keyword]);

    const handleOutsideClick = async (e: any) => {
        if (e.target.closest('#listProduct') || e.target.closest('#clickShowProduct')) {
            return
        }
        setIsSearch(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <div>
            <form className="flex items-center mr-auto " onSubmit={handleSubmit(onHandlesSearch)}>

                <input
                    className="block w-full h-10 px-5 py-2 outline-none hover:border-secondary border hover:border duration-200 rounded-s-lg"
                    type="text"
                    placeholder="Tim kiếm sản phẩm ..." {...register("_keywords")}
                    onChange={(e) => setKeyWord(e.target.value)
                    }
                />

                <button id="clickShowProduct"
                    type="submit"
                    className="px-8 py-2  rounded d-r-lg bg-secondary"
                    aria-label="Justify"
                    onClick={() => setIsSearch(true)}
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>

            </form>
            {isSearch &&
                <div className="rounded-md z-50 absolute w-[530px] mt-5" id="listProduct">
                    <div className="container  ">
                        <div className="p-2 bg-white rounded-md">
                            {/* check khong có sản phẩm nào thì hiển thị ra */}
                            {product.length === 0 ? (
                                <div className="text-center">
                                    Không tìm thấy sản phẩm nào
                                </div>
                            ) : (
                                product.map((product, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="grid grid-cols-[80px,auto] h-full p-2 border rounded-md border-slate-200 gap-y-5 focus:visible">
                                                <div className="">
                                                    <Link to="">
                                                        <img
                                                            src={product.product_images}
                                                            alt="ảnh"
                                                            className="transition duration-200 ease-in-out hover:scale-105 md:h-[30px] md:w-[30px]"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="gap-y-3">
                                                    <Link
                                                        to={`products/${product._id}`}
                                                        className="hover:text-yellow-500 transition duration-200"
                                                    >
                                                        {product.product_name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div >
                    </div >
                </div >
            }
        </div >
    )
}
export default Search