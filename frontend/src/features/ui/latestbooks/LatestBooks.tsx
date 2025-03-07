import CardList from "@/shared/components/ui/card-list";

const LatestBooks: React.FC = () => {

    const quantity = 6;

    return (
        <CardList quantity={quantity} />

    )
}

export default LatestBooks;