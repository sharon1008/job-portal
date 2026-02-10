import { useParams } from "react-router-dom";
import JobCardsList from "./JobCardsList";
import { Container } from "react-bootstrap";

function CategoryJobs({ jobs }) {
  const { categoryName } = useParams();

  const decodedCategory = decodeURIComponent(categoryName);

  const filteredJobs = jobs.filter(
    (job) => job.department === decodedCategory
  );

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-center mb-4">
        Jobs in {decodedCategory}
      </h2>

      <JobCardsList jobs={filteredJobs} />
    </Container>
  );
}

export default CategoryJobs;
