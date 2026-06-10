"use client";

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectStudentInternshipApplications, setStudentApplications } from '@/lib/features/student/studentSlice';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import { CalendarDays, Clock3, Banknote } from 'lucide-react';
import { callBackend } from '@/actions/backend-proxy';
import ViewStudentApplication from './ViewStudentApplication';
import EditStudentApplication from './EditStudentApplication';

const StudentApplicationsPage = () => {
  const applications = useAppSelector(selectStudentInternshipApplications);
  const [statusFilter, setStatusFilter] = useState<'ALL' | "APPLIED" | "SHORTLISTED" | "INTERVIEWING" | "SELECTED" | "REJECTED">('ALL');

  const [viewApplication, setViewApplication] = useState<number | string | null>(null);
  const [editApplication, setEditApplication] = useState<number | string | null>(null);

  const dispatch = useAppDispatch();  

  const filteredApplications = useMemo(() => {
    return applications?.filter(app => 
      statusFilter === 'ALL' ? true : app.status === statusFilter
    );
  }, [applications, statusFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const fetchApplications = async () => {
    try {
        const res = await callBackend("/student/applications");
        if(!res.success) {
            throw new Error(res.data || "Failed to fetch applications");
        }
        dispatch(setStudentApplications(res.data));
    }
    catch (error) {
        console.error("Error fetching student applications:", error);
    }
  }


  useEffect(() => {
    fetchApplications();
  }, [dispatch])

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-bold">My Applications</h1>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Status:</span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f as typeof statusFilter)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  statusFilter === f 
                    ? "bg-black text-white dark:bg-white dark:text-black" 
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              {statusFilter === 'ALL' 
                ? "You haven't applied to any internships yet."
                : `No ${statusFilter.toLowerCase()} applications found.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApplications.map((application) => (
              <Card 
                key={application.id} 
                className="flex flex-col group h-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all"
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-bold">{application.internshipPosting.title}</h2>
                        <Tag size="sm">
                          {application.internshipPosting.location.replace("_", " ")}
                        </Tag>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">                                                
                        <span>{application.internshipPosting.company.name}</span>
                        {application.internshipPosting.company.isVerified && (
                          <span className="text-blue-500" title="Verified">✓</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800">
                      <span>{application.status}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-neutral-500" />
                      <span className="font-medium">Salary:</span>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Rs. {typeof application.internshipPosting.salary === "number" 
                          ? application.internshipPosting.salary.toLocaleString() 
                          : application.internshipPosting.salary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="w-4 h-4 text-neutral-500" />
                      <span className="font-medium">Duration:</span>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {application.internshipPosting.duration}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-900 flex flex-col gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      Applied: {formatDate(application.appliedAt)}
                    </span>
                    {application.reviewedAt && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        Reviewed: {formatDate(application.reviewedAt)}
                      </span>
                    )}
                  </div>


                  {application.isApproved !== null && (
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-900">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Teacher Review:</p>
                      <p className={`text-xs font-medium ${application.isApproved ? 'text-green-600' : 'text-red-600'}`}>
                        {application.isApproved ? '✓ Approved' : '✗ Not Approved'}
                      </p>
                      {application.reviewNote && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                          {application.reviewNote}
                        </p>
                      )}
                    </div>
                  )}

              
                  {application.internshipPosting.requiredSkills.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-900">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {application.internshipPosting.requiredSkills.slice(0, 3).map((skill) => (
                          <Tag key={skill.id} size="sm" className="text-xs">
                            {skill.name}
                          </Tag>
                        ))}
                        {application.internshipPosting.requiredSkills.length > 3 && (
                          <Tag size="sm" className="text-xs">
                            +{application.internshipPosting.requiredSkills.length - 3}
                          </Tag>
                        )}
                      </div>
                    </div>
                  )}

                 
                  <div className="mt-auto pt-4 flex gap-2">
                    <Button
                      onClick={() => {
                        setViewApplication(application.id);
                      }}
                      className="w-full text-xs px-2"
                      size="md"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => {
                        setEditApplication(application.id);
                      }}
                      className="w-full text-xs px-2"
                      size="md"
                      variant="secondary"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {viewApplication && (
        <ViewStudentApplication
          applicationId={viewApplication}
          onClose={() => setViewApplication(null)}
          onEdit={() => {
            setEditApplication(viewApplication);
            setViewApplication(null);
          }}
        />
      )}

      {editApplication && (
        <EditStudentApplication
          applicationId={editApplication}
          onClose={() => setEditApplication(null)}
        />
      )}
    </div>
  );
};

export default StudentApplicationsPage;