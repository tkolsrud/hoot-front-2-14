import styles from './BlogList.module.css'

import BlogCard from '../../components/BlogCard/BlogCard';

const BlogList = (props) => {
  console.log('BlogList props:', props);
  // const { blogs } = props
  // blogs is props.blogs
  return (
    <main className={styles.container}>
      {props.blogs.map((blog) => (
        <BlogCard blog={blog} key={blog._id} />
      ))}
    </main>
  )
}

export default BlogList
