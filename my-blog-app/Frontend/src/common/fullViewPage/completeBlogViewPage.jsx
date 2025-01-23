import React from "react";
import LikesAndComment from "../likesAndComment/likesAndComment";
import CommentComponent from "../commentComponent/commentComponent";

// import { Blogs } from '../blog.Data';

const CompleteBlogViewPage = () => {
  return (
    <div className="w-11/12 md:w-3/6 mx-auto pt-6 font-serif">
      <div className="mx-auto">
        <div className="w-11/12 mx-auto">
          <h1 className="text-5xl font-semibold py-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis, quis?
          </h1>
          <span className="font-light text-lg">Written by : <span className="text-purple-500">Umang Ladha</span></span>
        </div>
        <div className="my-7">
          <hr />
          <div className="py-4 px-8">
            <LikesAndComment />
          </div>
          <hr />
        </div>
        <div className="border w-4/5 mx-auto h-80 mb-14">
          <img className="w-full h-full" src="/" alt="" />
        </div>
        <div className="px-4 mb-7 text-lg">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            fuga quisquam reiciendis ex non nobis natus, iste illum qui quasi
            deleniti repellendus nostrum quia inventore sint vero incidunt
            debitis sit similique magni voluptates! Tempore architecto commodi
            fugiat, veritatis sunt totam dolore ad nobis? Esse, dolor
            consequatur odio sit recusandae deleniti error assumenda fugit
            quidem. Doloribus, at. Quisquam ullam rem, excepturi molestiae quam
            nam impedit beatae corporis, voluptates illum assumenda iure nisi
            dolore laboriosam consequuntur repellendus vero a. Perspiciatis
            dolore voluptatem, dignissimos esse, vero impedit voluptate eaque,
            autem ut tempora doloribus doloremque! Nemo inventore fuga
            laudantium aliquam doloribus fugit similique? Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Hic quis ex reiciendis sit quia
            mollitia iure tempora corporis cupiditate iusto nihil architecto
            doloribus, libero distinctio, beatae, at unde dicta ipsa eveniet
            vero accusamus. Atque non voluptates exercitationem, voluptate
            consequatur dignissimos! Fugit architecto expedita obcaecati ipsum
            nulla voluptatem sit illo dolorem libero itaque unde nostrum totam
            atque placeat molestias excepturi soluta, hic aperiam adipisci
            maxime repellat facere magnam aliquid eius? Architecto ab, quisquam
            repellendus consequatur veniam dolorem nobis deleniti vel iste
            laboriosam omnis mollitia in impedit eum soluta facilis ratione
            recusandae rem praesentium veritatis debitis ex? Eveniet enim est
            veritatis ipsam.
          </p>
        </div>

        <hr />
        <CommentComponent/>
      </div>
    </div>
  );
};

export default CompleteBlogViewPage;
