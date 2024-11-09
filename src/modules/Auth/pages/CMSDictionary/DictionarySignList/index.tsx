import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../../components/FormElement/style/inputField.css';
import './index.css';

const DictionarySignList = () => {
  const [filter, setFilter] = useState(false);

  return (
    <section className="dictionary-sign">
      <div className="container">
        <div className="dictionary-filter-wrap">
          <p className="dictionary-filter-title">Over 5000 signs</p>
          <div className="dictionary-search-wrap">
            <input
              className="inputField"
              type="search"
              placeholder="Search for a sign"
            />
            <div className="filter-wrap">
              <Button
                className="filter-icon"
                onClickHandler={() => setFilter(!filter)}
              >
                <Image iconName="filter" />
              </Button>
              {filter && (
                <div className="filter-list">
                  <div className="inner scroll-hide">
                    <Checkbox
                      parentClass="items-center gap-1"
                      text="Item 1"
                      name="sd"
                    />

                    <Checkbox
                      parentClass="items-center gap-1"
                      text="Item 1"
                      name="sd"
                    />

                    <Checkbox
                      parentClass="items-center gap-1"
                      text="Item 1"
                      name="sd"
                    />

                    <Checkbox
                      parentClass="items-center gap-1"
                      text="Item 1"
                      name="sd"
                    />

                    <Checkbox
                      parentClass="items-center gap-1"
                      text="Item 1"
                      name="sd"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="dictionary-sign-list">
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
          </div>
          <div className="dictionary-sign-item isLocked">
            <span>ONE(1)</span>
            <Image src="/images/sign-1.png" isFromDataBase={false} />
            <span className="lock-icon">
              <Image iconName="lock" />
            </span>
          </div>
        </div>
        <div className="btn btn-black-border">
          <Link to="./">
            Learn More Vocab
            <Image iconName="arrowRight" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DictionarySignList;
